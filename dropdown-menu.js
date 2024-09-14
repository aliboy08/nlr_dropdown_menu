(function(){

    class Tabs {

        constructor( container ){
            this.container = container;
            this.init();
        }
    
        init(){
            this.navs = this.container.querySelectorAll('.dd_tab_nav');
            this.contents = this.container.querySelectorAll('.dd_tab_content');

            this.current_nav = this.navs[0];
            this.current_content = this.contents[0];
            
            this.navs.forEach((nav, index)=>{
                nav.tab_content = this.contents[index];
                nav.addEventListener('click', ()=>{
                    this.activate(nav);
                })
            })
        }
    
        activate(nav){
    
            if( this.current_nav == nav ) return;
    
            if( this.current_nav ) {
                this.current_nav.classList.remove('active');
            }
    
            if( this.current_content ) {
                this.current_content.style.display = 'none';
                // this.current_content.style.animation = '';
                this.current_content.classList.remove('active');
            }
    
            this.current_nav = nav;
            this.current_content = nav.tab_content;
    
            this.current_nav.classList.add('active');
            this.current_content.style.display = '';
            // this.current_content.style.animation = this.animation;
            this.current_content.classList.add('active');
        }
        
    }

    let current_menu = null;
    
    function init(){

        // dropdown
        const dd_content_con = document.querySelector('.dd_content_con');
        document.querySelector('.elementor-location-header').append(dd_content_con);

        // tabs
        dd_content_con.querySelectorAll('.dd_tabs').forEach(tabs=>{
            new Tabs(tabs);
        })

        // menu
        document.querySelectorAll('.custom_main_menu > li > a').forEach(a=>{

            a.dropdown = null;
            a.dropdown_is_open = false;

            const with_custom_dropdown = a.parentElement.classList.contains('custom_dd_menu');

            if( with_custom_dropdown ) {
                // custom dropdown
                const target = a.parentElement.className.split('dd_target_')[1].split(' ')[0];
                a.dropdown = document.getElementById('dd_content_'+ target);
                a.dropdown_type = 'custom';
            }
            else if ( a.nextElementSibling ) {
                // regular sub menu
                a.dropdown = a.nextElementSibling;
                a.dropdown_type = 'sub_menu';
            }
            
            a.addEventListener('click',e=>{
                if( a.dropdown ) {
                    e.preventDefault();
                    dropdown_toggle(a);
                }
            })
        })
    }

    function dropdown_toggle(a){

        if( current_menu && current_menu != a ) {
            // close previous menu
            dropdown_close(current_menu);
        }
        
        if( a.dropdown_is_open ) {
            dropdown_close(a);
            current_menu = null;
        }
        else {
            dropdown_open(a);
            current_menu = a;
        }
    }

    function dropdown_close(a){

        a.dropdown_is_open = false;

        if( a.dropdown_type == 'sub_menu' ) {
            // sub menu
            a.dropdown.classList.remove('open');
        }
        else {
            // custom dropdown
            a.dropdown.style.display = 'none';
            a.dropdown.style.opacity = 0;
        }

        document.body.removeEventListener('click', outside_click_close);
    }

    function dropdown_open(a){

        a.dropdown_is_open = true;

        if( a.dropdown_type == 'sub_menu' ) {
            // sub menu
            a.dropdown.classList.add('open');
        }
        else {
            // custom dropdown
            a.dropdown.style.display = '';
            setTimeout(()=>{
                a.dropdown.style.opacity = 1;
            }, 10);
        }

        document.body.addEventListener('click', outside_click_close);
    }

    function outside_click_close(e){
        if( e.target == current_menu ) return;
        if( e.target.closest('.dd_content_con') ) return;
        dropdown_close(current_menu);
    }
    
    document.addEventListener('DOMContentLoaded', init);
})();