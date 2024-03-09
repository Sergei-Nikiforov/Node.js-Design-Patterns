export class TaskQueue {
  constructor (concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  async runTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => {
        return task().then(resolve, reject)
      })
      process.nextTick(this.next.bind(this))
    })
  }

  next_1 () {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift()
      task().finally(() => {
        this.running--
        this.next()
      })
      this.running++
    }
  }

  async next () {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      try {
        await task();
      } finally {
        this.running--
        await this.next();
      }

      this.running++
      
    }
  }

}
