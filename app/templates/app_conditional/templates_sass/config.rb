## RWRW needs docs for yo Jek

## RWRW is this relative?
add_import_path "components"
# Require any additional compass plugins here
# example blah blah

# All preprocessors should output expanded code
# Assets will be minified and revved on build by Grunt
output_style = :expanded
asset_cache_buster :none

# Directory settings, relative to config.rb
http_path = "/" # Set to the root of your project when deployed
sass_dir = "_scss"
css_dir = "_site/css"
images_dir = "img"
generated_images_dir = "_site/img/sprites"
javascripts_dir = "_site/js"

# Enable relative paths for Compass asset helpers
relative_assets = true



## RWRW does this work? Get most recent info.
# To debug directly with FireSass or Chrome Web Inspector, pass options to sass.
sass_options = (environment == :development && debug == true) ? {:debug_info => true} : {}
