export default function (initValue = 0) {
  const counter = ref(initValue)

  const increase = () => {
    counter.value++
  }

  return {
    counter,
    increase,
  }
}
