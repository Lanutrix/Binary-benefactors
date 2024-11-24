#include "inference.h"

int main(int argc, char** argv) {
	  
	const std::string sourceType = argv[1];
	std::cout << sourceType << std::endl;
	 const std::string objType = argv[2];
	std::cout << objType << std::endl;
	const int blurRate = atoi(argv[3]);
	std::cout << blurRate << std::endl;
	const std::string sourceFile = argv[4];
	std::cout << sourceFile << std::endl;
	const std::string outputName = argv[5];
	const std::string modelType = argv[6];
	std::cout << modelType << std::endl;
	const std::string classesFile = argv[7];
	std::string changeFile;
	if (sourceType == "changePhoto" || sourceType == "changeVideo") {
		changeFile = argv[8];
	}
	std::cout << classesFile << std::endl;
	Inference inf(modelType, cv::Size(640, 640), classesFile, false);

	std::ifstream inputFile(classesFile);
	std::string line;

	while (std::getline(inputFile, line)) {
		if (!line.empty()) {
			inf.classes.push_back(line);
		}
	}
	if (sourceType == "photo") {
		cv::Mat frame{};
		frame = cv::imread(sourceFile);
		cv::Mat blur = bluring(objType, blurRate, frame, inf, 0, cv::Mat{});
		cv::imwrite(outputName, frame);
	}
	else if (sourceType=="video") {
		cv::VideoCapture video(sourceFile);
		bool setup_writer = false;
		cv::VideoWriter writer;
		cv::Mat frame;
		while (video.read(frame)) {		
			frame = bluring(objType, blurRate, frame, inf, 0, cv::Mat{});
			if (!setup_writer) {
				writer = cv::VideoWriter(outputName, cv::VideoWriter::fourcc('m', 'p', '4', 'v'), 60, frame.size());
				setup_writer = true;
			}
			writer.write(frame);
		}
		writer.release();
		video.release();
	}
	else if (sourceType=="changePhoto") {
		cv::Mat change = cv::imread(changeFile);
		cv::Mat frame = cv::imread(sourceFile);
		frame = bluring(objType, blurRate, frame, inf, 1, change);
		cv::imwrite(outputName, frame);
	}
	else {
		cv::VideoCapture video(sourceFile);
		bool setup_writer = false;
		cv::VideoWriter writer;
		cv::Mat frame;
		cv::Mat change = cv::imread(changeFile);
		while (video.read(frame)) {
			frame = bluring(objType, blurRate, frame, inf, 1, change);
			if (!setup_writer) {
				writer = cv::VideoWriter(outputName, cv::VideoWriter::fourcc('m', 'p', '4', 'v'), 60, frame.size());
				setup_writer = true;
			}
			writer.write(frame);
		}
		writer.release();
		video.release();
	}
	cv::destroyAllWindows();
	return 0;
}