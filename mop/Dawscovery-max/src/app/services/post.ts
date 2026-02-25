import { inject, Injectable, signal } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, arrayUnion, doc, updateDoc } from '@angular/fire/firestore';
import { ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async createPost(
    title: string,
    address: string,
    imageFiles: string,
    noise: number,
    massification: number,
    price: number,
    aesthetics: number
  ): Promise<boolean> {
    const user = this.auth.currentUser;
    if (!user) return false;

    try {
      // Upload all images and collect their URLs
      // const imageUrls = await Promise.all(
      //   imageFiles.map(file => this.uploadImage(file))
      // );

      const imageUrls = [imageFiles];

      const newPost: Omit<Post, 'id'> = {
        title,
        address,
        images: imageUrls,
        description: '',
        rating: { noise, massification, price, aesthetics },
        author: user.uid,
        authorName: user.email ?? 'unknown', // swap for username later
        likes: [],
        savedBy: [],
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(this.firestore, 'posts'), newPost);
      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async savePost(postId: string): Promise<boolean> {
    const user = this.auth.currentUser;
    if (!user) return false;

    try {
      const userDoc = doc(this.firestore, 'users', user.uid);
      // arrayUnion adds the value only if it's not already in the array
      // so the user can't save the same post twice
      await updateDoc(userDoc, { savedPosts: arrayUnion(postId) });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  get getPosts() {
    return collectionData(collection(this.firestore, 'posts'), { idField: 'id' }) as Observable<Post[]>;
  }
}