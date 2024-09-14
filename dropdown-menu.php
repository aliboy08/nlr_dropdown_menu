<?php
$main_menu_dropdown = get_field('main_menu_dropdown', 'option');
if( !$main_menu_dropdown ) return;

wp_enqueue_script('ff-dropdown-menu', ff_filemtime('/modules/main-menu/dropdown-menu.js'), [], null, true);
wp_enqueue_style('ff-dropdown-menu', ff_filemtime('/modules/main-menu/dropdown-menu.css'));
// wp_enqueue_style('temp-main-menu', ff_filemtime('/modules/main-menu/temp-main-menu.css'));

echo '<div class="dd_content_con">';
foreach( $main_menu_dropdown as $data ) {
    echo '<div id="dd_content_'. $data['id'] .'" data-target="'. $data['id'] .'" class="dd_content" style="display:none">';
        echo '<div class="wrapper">';
            include 'dd-'.$data['acf_fc_layout'].'.php';
        echo '</div>';
    echo '</div>';
}
echo '</div>';