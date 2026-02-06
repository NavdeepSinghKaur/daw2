<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'GET' || !isset($_SESSION['level'])) {
    return http_response_code(403);
}


include __DIR__ . '/../../header.php';


?>

<h1 class="display-3 m-3">Articles preferits</h1>
<hr>
    <div class="card w-50 mx-auto my-5 shadow rounded-4 p-3">
        <h3 class="card-title display-4 ">ABCD</h3>
        <p class="card-text m-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dignissimos fugit voluptate aut magnam iste earum accusantium rerum alias accusamus, iure doloremque libero tempora esse unde laborum harum nobis repudiandae ab aperiam cumque! Totam quaerat tenetur esse ducimus aperiam molestiae et neque ab repudiandae ut aspernatur adipisci exercitationem fuga perferendis, quia veniam quas cumque perspiciatis fugit eaque vel pariatur. Repellat explicabo at quod accusamus, natus voluptates impedit. Assumenda tempore rerum tenetur adipisci perferendis earum et voluptatum eum incidunt dolores vel expedita officiis maiores inventore dolorem rem minus dolorum eligendi odit perspiciatis, blanditiis corrupti harum at dolore? Exercitationem minima, necessitatibus, quaerat sunt id fugiat vel corrupti culpa est eius illo facilis cupiditate labore magni, repudiandae distinctio aut. Rem quasi, delectus quos maiores totam nemo aliquid tempora, consequuntur necessitatibus, ipsa debitis architecto repellendus labore atque magni aperiam ea accusamus assumenda similique consequatur? Sit, placeat necessitatibus enim assumenda minima alias vel tempora molestiae veritatis ducimus, doloribus, nam rem? Veritatis quia reiciendis, quis cum nobis facilis sed mollitia beatae voluptatem ipsum nam unde nisi ducimus ipsam voluptate earum. Vitae, ullam iure exercitationem natus facere iusto. Explicabo earum, deleniti laborum error sapiente adipisci dolor enim. Qui dolor sapiente, laboriosam eius cumque minima quod expedita perspiciatis.</p>
        <small class="mx-3">xyz</small>
    </div>
</body>
</html>