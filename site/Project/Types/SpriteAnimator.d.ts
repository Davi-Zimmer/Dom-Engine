import FrameType from "./FrameType"

interface SpriteAnimatorType {

    constructor(frames: FrameType[]): SpriteAnimatorType

    update() : void

    setFrames(newFrames: FrameType[]) :void 

    getCurrentFrame(): FrameType

    reset(): void
}

export default SpriteAnimatorType