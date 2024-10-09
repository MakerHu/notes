<script setup>

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']); // 定义事件

const updateValue = (value) => {
  emit('update:modelValue', value); // 发出事件以更新父组件中的值
};
</script>

<template>
    <input type="checkbox" class="l" :checked="modelValue" @change="updateValue($event.target.checked)">
</template>

<style scoped>
/* From Uiverse.io by JkHuger */ 
.l {
  display: block;
  margin-bottom: 1.5em;
  font-size: 1em;
}

.l {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 0.75em;
  box-shadow: inset 5px 5px 10px #b3b3b3,
  inset -5px -5px 10px #ffffff;;
  color: #d7d7d7;
  display: inline-flex;
  align-items: center;
  margin: auto;
  padding: 0.15em;
  width: 3em;
  height: 1.5em;
  transition: background-color 0.1s 0.3s ease-out, box-shadow 0.1s 0.3s ease-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}

.l:before, .l:after {
  content: "";
  display: block;
}

.l:before {
  background-color: #fdea7b;
  border-radius: 50%;
  width: 1.2em;
  height: 1.2em;
  transition: background-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
  z-index: 1;
}

.l:after {
  background: linear-gradient(transparent 50%, rgba(0,0,0,0.15) 0) 0 50% / 50% 100%,
		repeating-linear-gradient(90deg,#bbb 0,#bbb,#bbb 20%,#999 20%,#999 40%) 0 50% / 50% 100%,
		radial-gradient(circle at 50% 50%,#888 25%, transparent 26%);
  background-repeat: no-repeat;
  border: 0.25em solid transparent;
  border-left: 0.4em solid #fdea7b;
  border-right: 0 solid transparent;
  transition: border-left-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
  transform: translateX(-22.5%);
  transform-origin: 25% 50%;
  width: 1.2em;
  height: 1em;
  box-sizing: border-box;
}
/* Checked */
.l:checked {
  background-color: rgba(0,0,0,0.45);
  box-shadow: inset 5px 5px 10px #000000,
  inset -5px -5px 10px #3a3a3a;;;
}

.l:checked:before {
  background-color: currentColor;
  transform: translateX(125%)
}

.l:checked:after {
  border-left-color: currentColor;
  transform: translateX(-2.5%) rotateY(180deg);
}
/* Other States */
.l:focus {
	/* Usually an anti-A11Y practice but set to remove an annoyance just for this demo */
  outline: 0;
}

</style>