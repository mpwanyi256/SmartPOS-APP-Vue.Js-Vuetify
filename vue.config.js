module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/app'
}
/*
.htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /app
    RewriteRule ^app/index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /app/index.html [L]
</IfModule>
*/
