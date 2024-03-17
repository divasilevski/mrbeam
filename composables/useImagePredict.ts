/* eslint-disable */
import {
  env,
  AutoModel,
  AutoProcessor,
  RawImage,
} from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0'
import { nanoid } from 'nanoid'
import { useMainStore } from '~/stores/useMainStore'

const model_id = 'vpvpvpvp/mrbeam_v9_gelan-c'

function clipBoxes(boxes, shape) {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i][0] = Math.max(0, Math.min(boxes[i][0], shape[1])) // x1
    boxes[i][1] = Math.max(0, Math.min(boxes[i][1], shape[0])) // y1
    boxes[i][2] = Math.max(0, Math.min(boxes[i][2], shape[1])) // x2
    boxes[i][3] = Math.max(0, Math.min(boxes[i][3], shape[0])) // y2
  }
}

function scaleBoxes(source_shape, target_shape, boxes, ratioPad = null) {
  let gain, pad
  if (ratioPad === null) {
    gain = Math.min(
      source_shape[0] / target_shape[0],
      source_shape[1] / target_shape[1],
    ) // gain  = old / new
    pad = [
      (source_shape[1] - target_shape[1] * gain) / 2,
      (source_shape[0] - target_shape[0] * gain) / 2,
    ] // wh padding
  } else {
    gain = ratioPad[0][0]
    pad = ratioPad[1]
  }

  for (let i = 0; i < boxes.length; i++) {
    boxes[i][0] -= pad[0] // x padding
    boxes[i][2] -= pad[0] // x padding
    boxes[i][1] -= pad[1] // y padding
    boxes[i][3] -= pad[1] // y padding
    boxes[i][0] /= gain
    boxes[i][1] /= gain
    boxes[i][2] /= gain
    boxes[i][3] /= gain
  }

  clipBoxes(boxes, target_shape)
  return boxes
}

function readAsDataURL(file) {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(file)
  })
}

export default function () {
  const mainStore = useMainStore()

  const dict = [
    'point',
    'distload',
    'fixed',
    'force',
    'hinge',
    'moment',
    'simple',
    'simple',
  ]

  const calculate = (predictions: number[][]) => {
    const units: Unit[] = predictions.map((p) => {
      if (p[4] === 0) {
        return [
          {
            id: nanoid(),
            x: p[0],
            type: dict[p[4]],
          },
          {
            id: nanoid(),
            x: p[2],
            type: dict[p[4]],
          },
        ]
      }
      if (p[4] === 1) {
        return {
          id: nanoid(),
          x: [p[0], p[2]],
          value: 1,
          type: dict[p[4]],
        }
      }
      return {
        id: nanoid(),
        x: p[0] + (p[2] - p[0]) / 2,
        value: 1,
        type: dict[p[4]],
      }
    })
    console.log(units)
    mainStore.setUnits(units.flat())
  }

  const predictByImage = async (file: File) => {
    console.log(file)
    env.allowLocalModels = false
    env.useBrowserCache = false

    const model = await AutoModel.from_pretrained(model_id, {
      quantized: false, // (Optional) Use unquantized version.
    })
    console.log(model)
    const processor = await AutoProcessor.from_pretrained(model_id)

    const url = await readAsDataURL(file)
    console.log('?', url)
    const image = await RawImage.read(url)

    // https://github.com/xenova/transformers.js/blob/314b7f0dc4291e8a38a516073b710d7c6a29aefb/examples/remove-background-client/main.js#L89
    // const newImage = new RawImage(pixel_values[0][0].mul(255).to('uint8').data, 640, 640, 1);

    // const [imageWidth, imageHeight] = image.size

    // const fillColor = { r: 114, g: 114, b: 114, alpha: 1 }
    // const sharpImage = image.toSharp()
    // const resizedImage = await image.resize(640, 640, {
    //   fit: 'contain',
    //   background: fillColor,
    // })
    // .toFormat('jpg')
    // .toBuffer()

    // const blob = new Blob([new Uint8Array(resizedImage.buffer)])
    // const new_image = await RawImage.fromBlob(blob)

    const { pixel_values } = await processor(image)
    console.log('pixel_values', pixel_values)
    const { det_boxes } = await model({ images: pixel_values })
    console.log('det_boxes', det_boxes)
    // const predictions = det_boxes.tolist().map(x => x[0]);
    const predictions = det_boxes.tolist()

    console.log('Kоординаты ебаных балок:')
    console.log(predictions)
    calculate(predictions)
    // console.log(scaleBoxes([640, 640], [imageHeight, imageWidth], predictions))
  }

  return { predictByImage }
}
