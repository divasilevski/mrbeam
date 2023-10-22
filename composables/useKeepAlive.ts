export default function () {
  const isActivated = ref(true)
  const isDeactivated = ref(false)

  onActivated(() => {
    isActivated.value = true
    isDeactivated.value = false
  })

  onDeactivated(() => {
    isActivated.value = false
    isDeactivated.value = true
  })

  return { isActivated, isDeactivated }
}
