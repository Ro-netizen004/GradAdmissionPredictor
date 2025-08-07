# Graduate Admission Predictor
Link to site: https://gradadmissionpredictor.onrender.com/

A web application that predicts the chance of admission to graduate programs using a Linear Regression model built with Scikit-Learn. The model uses various academic and application parameters to provide a probability score that helps prospective students assess their chances of admission.

## Features

- Predict admission chances based on GRE score, TOEFL score, University Rating, SOP, LOR strength, CGPA, and Research experience.
- Built with Python, Scikit-Learn, and Flask (or your chosen web framework).
- Simple, intuitive web interface for inputting applicant details and displaying predictions.
- Demonstrates end-to-end machine learning workflow: data preprocessing, training, evaluation, and deployment.

## Dataset

The dataset is sourced from [Mohan S Acharya’s Graduate Admissions dataset](https://www.kaggle.com/datasets/mohansacharya/graduate-admissions), which contains parameters important to graduate admissions from an Indian perspective.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/graduate-admission-predictor.git
   cd graduate-admission-predictor

2. Install required packages:
    pip install -r requirements.txt
    Run the web app:

3. Run the app
    python app.py


## Usage
Open the web application in your browser.

Input your academic and application details.

Submit to see your predicted chance of admission.

## Model Performance
R-squared: 0.83 (approximate)
Mean Squared Error: 0.0035
Mean Absolute Error: 0.043

## Citation
If you use this dataset or project for academic or professional purposes, please cite:
Mohan S Acharya, Asfia Armaan, Aneeta S Antony: "A Comparison of Regression Models for Prediction of Graduate Admissions", IEEE International Conference on Computational Intelligence in Data Science 2019.
Dataset available at: https://www.kaggle.com/datasets/mohansacharya/graduate-admissions

## License
This project uses the CC0: Public Domain licensed dataset.


