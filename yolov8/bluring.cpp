#include <iostream>
#include <vector>

#include <opencv2/opencv.hpp>

#include "inference.h"

using namespace std;
using namespace cv;


cv::Mat bluring(const std::string& objType, int blurRate, const cv::Mat& frame, Inference& inf) {
    std::vector<Detection> output = inf.runInference(frame);

    const int detections = output.size();
    std::cout << "Number of detections:" << detections << std::endl;

    for (int i = 0; i < detections; ++i)
    {
        const Detection detection = output[i];
        if (detection.className == objType) {
            const cv::Rect box = detection.box;
            const cv::Mat face = frame(box);
            blur(face, face, cv::Size(blurRate, blurRate));
            frame(box) = face;
        }
    }
    return frame;
}
