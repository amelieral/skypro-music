<template>
  <div class="playlist__item" @click="playThisTrack">
    <div class="playlist__track track">
      <div class="track__title">
        <div class="track__title-image">
          <svg v-if="!isPlaying" class="track__title-svg">
            <use xlink:href="/img/icon/sprite.svg#icon-note" />
          </svg>
          <span v-if="isPlaying" class="playing-dot"></span>
        </div>
        <div class="track__title-text">
          <a class="track__title-link" href="#" @click.prevent>
            {{ track.name || track.title }}
            <span class="track__title-span">{{ track.subtitle }}</span>
          </a>
        </div>
      </div>
      <div class="track__author">
        <a class="track__author-link" href="http/">{{
          track.author || track.artist
        }}</a>
      </div>
      <div class="track__album">
        <a class="track__album-link" href="http/">{{ track.album }}</a>
      </div>
      <div class="track__time">
        <svg class="track__time-svg">
          <use xlink:href="/img/icon/sprite.svg#icon-like" />
        </svg>
        <span class="track__time-text">{{
          track.duration_in_seconds
            ? formatDuration(track.duration_in_seconds)
            : track.duration
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  track: { type: Object, required: true },
});

const tracksStore = useTracks();
const playerStore = usePlayerStore();
const { formatDuration } = useTracks();
const { playTrack } = useAudioPlayer();

const isPlaying = computed(() => {
  const currentTrackId = playerStore.currentTrack?._id;
  const thisTrackId = props.track._id;

  return currentTrackId === thisTrackId && playerStore.isPlaying;
});

const playThisTrack = () => {
  playerStore.setPlaylist(tracksStore.tracks);
  playTrack(props.track);
};
</script>

<style scoped>
.track__title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 447px;
}

.track__title-image {
  width: 51px;
  height: 51px;
  padding: 16px;
  background: #313131;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 17px;
  position: relative;
}

.track__title-svg {
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
}

.track__title-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}

.track__title-span {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e4e4e;
}

.track__author {
  width: 321px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.track__author-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-align: left;
}

.track__album {
  width: 245px;
}

.track__album-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
}

.track__time-svg {
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: transparent;
  stroke: #696969;
}

.track__time-text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #696969;
}

.playlist__item {
  width: 100%;
  display: block;
  margin-bottom: 12px;
  cursor: pointer;
}

.playlist__track {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.playing-dot {
  width: 16px;
  height: 16px;
  background-color: #b672ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bubble_out 0.6s ease-in-out infinite both;
}

@keyframes bubble_out {
  0%,
  100% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}
</style>
