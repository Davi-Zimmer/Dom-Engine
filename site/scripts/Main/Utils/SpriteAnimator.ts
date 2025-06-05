type Frame = [number, number, number, number, number]

class SpriteAnimator {
    private frames: Frame[]
    private currentFrameIndex: number = 0
    private tickCount: number = 0

    constructor(frames: Frame[]) {
        this.frames = frames
    }

    update() {
        this.tickCount++

        const currentDelay = this.frames[this.currentFrameIndex][4]

        if (this.tickCount >= currentDelay) {
            this.tickCount = 0
            this.currentFrameIndex++

            if (this.currentFrameIndex >= this.frames.length) {
                this.currentFrameIndex = 0
            }
        }
    }

    setFrames(newFrames: Frame[]) {
        this.frames = newFrames
        this.currentFrameIndex = 0
        this.tickCount = 0
    }

    getCurrentFrame(): Frame {
        return this.frames[this.currentFrameIndex]
    }

    reset() {
        this.currentFrameIndex = 0
        this.tickCount = 0
    }
}

export default SpriteAnimator