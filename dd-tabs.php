<div class="dd_tabs">

    <div class="dd_tabs_nav">
    <?php
    $i = 0;
    foreach( $data['tabs'] as $tab ) : $i++; ?>
        <div class="dd_tab_nav<?php echo $i == 1 ? ' active' : ''; ?>"><?php echo $tab['title']; ?></div>
    <?php endforeach; ?>
    </div>

    <div class="dd_tabs_contents">

    <?php
    $i = 0;
    foreach( $data['tabs'] as $tab ) : $i++; ?>

        <div class="dd_tab_content" style="<?php echo $i == 1 ? '' : 'display:none;'; ?>">

            <div class="dd_content_groups">
            <?php foreach( $tab['groups'] as $group ) : ?>

                <div class="dd_content_group">
                <?php
                if( $group['image'] ) {
                    echo '<div class="image">'. wp_get_attachment_image($group['image'], 'medium_large') .'</div>';
                }

                if( $group['parent_link'] ) {
                    echo '<a href="'. $group['parent_link']['link'] .'" class="parent_link dd_link_style_1">'. $group['parent_link']['text'] .'</a>';
                }

                if( $group['links'] ) {
                    echo '<div class="links">';
                    foreach( $group['links'] as $link ) {
                        echo '<a href="'. $link['link'] .'">'. $link['text'] .'</a>';
                    }
                    echo '</div>';
                }
                ?>
                </div>

            <?php endforeach; ?>
            </div>

        </div>
    <?php endforeach; ?>
    </div>

</div>