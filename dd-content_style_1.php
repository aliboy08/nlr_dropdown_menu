<div class="dd_content_style_1">

    <?php if( $data['heading'] ) : ?>
    <div class="heading"><?php echo $data['heading'] ?></div>
    <?php endif; ?>

    <div class="items">
    <?php foreach( $data['items'] as $item ) : ?>
        <div class="item">
            <?php if( $item['image'] ) : ?>
            <div class="image image_fit">
                <a href="<?php echo $item['link']; ?>">
                    <?php echo wp_get_attachment_image($item['image'], 'medium_large'); ?>
                </a>
            </div>
            <?php endif; ?>
            <a href="<?php echo $item['link']; ?>" class="link dd_link_style_1"><?php echo $item['text']; ?></a>
        </div>
    <?php endforeach; ?>
    </div>

</div>