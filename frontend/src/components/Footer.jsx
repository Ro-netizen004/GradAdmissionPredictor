
const Footer = () => {
  return (

    <footer className="mt-12 py-4 bg-gray-100 text-center text-gray-600 text-sm">
        <p>
            &copy; {new Date().getFullYear()} Rodela. Graduate Admission Predictor.
        </p>
        <p className="mt-1">
            Dataset from{" "}
            <a
            href="https://www.kaggle.com/datasets/mohansacharya/graduate-admissions"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
            >
            Kaggle
            </a>
        </p>
    </footer>

  )
}

export default Footer

