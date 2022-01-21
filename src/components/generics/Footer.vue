<template>
    <div class="footer">
        <p class="prodev_info">
          <span>
            <v-avatar size="26">
              <img
                src="@/assets/logo.png"
                alt="uganda"
              >
            </v-avatar>
          </span>
          <a href="http://prodevgroup.22web.org/?i=2" target="__blank">
            Smart POS V-3.0.1
          </a>
          | Copyrite {{ new Date().getFullYear() }}
        </p>
    </div>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .footer {
        height: 36px;
        width: 100%;

        .prodev_info {
            text-align: center;
            color: $black;
            font-weight: bold;

            a {
            text-decoration: none;
            color: inherit;
            }
        }
    }
</style>
