import * as tf from "@tensorflow/tfjs";

import { IMAGENET_CLASSES } from "./imagenet_classes";

const PREPROCESS_DIVISOR = tf.scalar(255 / 2);

export class MobileNet {
  async load() {
    this.model = await tf.loadGraphModel(
      process.env.PUBLIC_URL + "/web_model/model.json"
    );
  }

  dispose() {
    if (this.model) {
      this.model.dispose();
    }
  }

  predict(input) {
    const preprocessedInput = tf.div(
      tf.sub(input.asType("float32"), PREPROCESS_DIVISOR),
      PREPROCESS_DIVISOR
    );
    const reshapedInput = preprocessedInput.reshape([
      1,
      ...preprocessedInput.shape,
    ]);
    return this.model.execute(reshapedInput);
  }

  getTopKClasses(logits, topK) {
    const predictions = tf.tidy(() => {
      return tf.softmax(logits);
    });

    const values = predictions.dataSync();
    predictions.dispose();

    let predictionList = [];
    for (let i = 0; i < values.length; i++) {
      predictionList.push({ value: values[i], index: i });
    }
    predictionList = predictionList
      .sort((a, b) => {
        return b.value - a.value;
      })
      .slice(0, topK);
    console.log(predictionList);
    return predictionList.map((x) => {
      return { label: IMAGENET_CLASSES[x.index], value: x.value };
    });
  }
}
