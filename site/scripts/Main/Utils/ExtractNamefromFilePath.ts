export default function extractNamefromFilePath( filepath: string ) {
    const match = filepath.match(/([^\/]+)(?=\.[^\/.]+$)/)

    return match ? match[1]: ''
}