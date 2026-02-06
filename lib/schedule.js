function scheduleDailyTask(
  task,
  interval = 24 * 60 * 60 * 1000, // default to 24 hours
  targetTime = '00:00:00',
  runImmediately = true,
) {
  if (runImmediately) task()

  const [hours, minutes, seconds] = targetTime.split(':').map(Number)

  const now = new Date()
  const nextTarget = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds,
  )

  if (nextTarget <= now) nextTarget.setDate(nextTarget.getDate() + 1)

  const timeUntilTarget = nextTarget - now

  setTimeout(() => {
    task()
    setInterval(task, interval)
  }, timeUntilTarget)
}

module.exports = { scheduleDailyTask }
