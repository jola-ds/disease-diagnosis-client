export const Footer = () => {
  return (
    <footer className="app-container bg-muted/50 h-fit border-t py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Medical Disclaimer */}
        <div className="border-primary-200 bg-background rounded-lg border p-4 text-center">
          <h3 className="text-primary-800 mb-2 font-medium">
            Important Medical Disclaimer
          </h3>
          <p className="text-primary-500 text-sm">
            This tool is for{" "}
            <strong>educational and research purposes only</strong>. It is not a
            substitute for professional medical advice, diagnosis, or treatment.
            Always consult a qualified healthcare professional for medical
            decisions.
          </p>
        </div>

        {/* App Info */}
        <div className="text-muted-foreground text-center text-sm">
          <p className="font-medium">Disease Diagnosis AI</p>
          <p>AI-Powered Disease Prediction for Nigerian Healthcare</p>
          <p className="mt-2">
            Powered by XGBoost Machine Learning • Trained on synthetic data
          </p>
        </div>
      </div>
    </footer>
  );
};
