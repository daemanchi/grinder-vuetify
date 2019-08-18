<template>
  <div class="icons-holder">
    <img v-if="likeStatus"
         style="display: block; margin-bottom: 15px;"
         alt="like"
         @click.stop="$emit('like')"
         src="@/assets/icons/icon-heart-filled@3x.png"
         srcset="@/assets/icons/icon-heart-filled.png, @/assets/icons/icon-heart-filled@2x.png 2x, @/assets/icons/icon-heart-filled@3x.png 3x" />
    <img v-else
         style="display: block; margin-bottom: 15px;"
         alt="like"
         @click.stop="$emit('like')"
         src="@/assets/icons/icon-heart-outlined@3x.png"
         srcset="@/assets/icons/icon-heart-outlined.png, @/assets/icons/icon-heart-outlined@2x.png 2x, @/assets/icons/icon-heart-outlined@3x.png 3x" />
    <img style="display: block; margin-bottom: 15px;"
         @click.stop="$emit('share:toggle')"
         src="@/assets/icons/icon-share@3x.png" alt="share"
         srcset="@/assets/icons/icon-share.png, @/assets/icons/icon-share@2x.png 2x, @/assets/icons/icon-share@3x.png 3x" />
    <img v-if="isOpenComments"
         @click.stop="$emit('comment:toggle')"
         style="display: block;"
         src="@/assets/icons/icon-comment-filled@3x.png" alt="comment"
         srcset="@/assets/icons/icon-comment-filled.png, @/assets/icons/icon-comment-filled@2x.png 2x, @/assets/icons/icon-comment-filled@3x.png 3x" />
    <img v-else
         @click.stop="$emit('comment:toggle')"
         style="display: block;"
         src="@/assets/icons/icon-comment-outlined@3x.png" alt="comment"
         srcset="@/assets/icons/icon-comment-outlined.png, @/assets/icons/icon-comment-outlined@2x.png 2x, @/assets/icons/icon-comment-outlined@3x.png 3x" />
  </div>
</template>

<script>
  export default {
    name: 'ReviewActionsHolder',
    props: [ 'likeStatus', 'isOpenComments' ]
  }
</script>

<style lang="scss" scoped>
  .icons-holder {
    z-index: 2;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 15px;
    margin-bottom: 18px;
    margin-bottom: calc(18px + constant(safe-area-inset-bottom));
    margin-bottom: calc(18px + env(safe-area-inset-bottom));

    transition: all .3s ease;
  }
</style>
