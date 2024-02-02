import torch
from torchvision.models import googlenet
from torchvision import transforms
from PIL import Image
from torch import nn
import os

class ImageClassifier:
    def __init__(self, model_path, class_labels, num_classes):
        # Load the GoogLeNet model
        self.model = googlenet(weights=None, aux_logits=False, init_weights=True)

        # Modify the last layer to match the number of classes used during training
        self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)

        # Check if GPU is available
        self.use_cuda = torch.cuda.is_available()
        if self.use_cuda:
            self.model = self.model.cuda()

        # Load the trained weights
        self.model.load_state_dict(torch.load(model_path), strict=False)

        self.model.eval()

        # Define the transformation for the input image
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

        # Class labels
        self.class_labels = class_labels

    def predict_class(self, image_path=None):
        if image_path is None:
            # Get the first image from the uploads folder
            image_folder = r"./public/images/uploads"  # Adjust path if needed
            image_files = [
                f for f in os.listdir(image_folder)
                if f.lower().endswith((".jpg", ".jpeg", ".png"))  # Case-insensitive
            ]

            if image_files:
                first_image_path = os.path.join(image_folder, image_files[0])
            else:
                return "PLease upload a JPG, JPEG OR PNG image"
        else:
            first_image_path = image_path

        # Load and preprocess the first image
        image = Image.open(first_image_path)
        input_tensor = self.transform(image)
        input_batch = input_tensor.unsqueeze(0)  # Add a batch dimension

        # Move to GPU if available
        if self.use_cuda:
            input_batch = input_batch.cuda()

        # Make the prediction
        with torch.no_grad():
            output = self.model(input_batch)

        # Assuming your model outputs class probabilities, get the predicted class
        _, predicted_class = torch.max(output, 1)

        return self.class_labels[predicted_class.item()]

# Example usage (assuming integration with Express app):
model_path = './routes/python_scripts/model_trained.pt'
class_labels = ['BrownSpot', 'Healthy', 'Hispa', 'LeafBlast']
num_classes = len(class_labels)

classifier = ImageClassifier(model_path, class_labels, num_classes)
predicted_class = classifier.predict_class()  # Call the modified function
print(predicted_class)

