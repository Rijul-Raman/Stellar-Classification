from flask import Flask, request, jsonify
from flask_cors import CORS  # You'll need to install flask-cors: pip install flask-cors
import numpy as np
import joblib


app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    required_fields = ['u', 'g', 'r', 'i', 'z', 'spec_obj_ID', 'redshift', 'plate', 'MJD']
    
    # Check if all required fields are present
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Extract and convert data to float
        X = np.array([[float(data[field]) for field in required_fields]])

        model = joblib.load('random_forest_model.pkl')
        prediction = model.predict(X)

        classes = ["GALAXY", "STAR", "QUASAR OBJECT"]
        celestial_body = classes[prediction[0]]

        descriptions = {
            "GALAXY": "A galaxy is a vast system of stars, stellar remnants, gas, dust, and dark matter, bound together by gravity. They vary in size and shape, with some containing billions of stars. Galaxies are categorized into several types, including spiral, elliptical, and irregular. The Milky Way, our home galaxy, is a barred spiral galaxy that hosts billions of stars, including our Sun. Galaxies often form clusters, and their interactions can lead to phenomena such as star formation and the merging of galaxies, significantly influencing the evolution of the universe.",
            
            "STAR": "A star is a massive, luminous sphere of plasma held together by its own gravity. Stars are primarily composed of hydrogen and helium, and they undergo nuclear fusion in their cores, converting hydrogen into helium and releasing vast amounts of energy in the form of light and heat. This process makes stars visible across the cosmos. They vary in size, temperature, and brightness, leading to classifications such as red dwarfs, yellow dwarfs (like the Sun), and massive blue stars. The lifecycle of a star includes stages like main sequence, red giant, and eventual death, resulting in phenomena like supernovae or black holes.",
            
            "QUASAR OBJECT": "A quasar is an extremely luminous and active galactic nucleus, powered by a supermassive black hole at its center. As matter falls into the black hole, it heats up and emits immense amounts of energy across the electromagnetic spectrum, often outshining entire galaxies. Quasars are considered some of the most distant objects in the universe, providing insights into the early universe's structure and evolution. They are characterized by their rapid brightness fluctuations and strong emission lines in their spectra. The study of quasars helps astronomers understand the formation of galaxies and the behavior of matter in extreme gravitational fields."
        }

        return jsonify({
            'celestial_body': celestial_body,
            'description': descriptions[celestial_body]
        })

    except ValueError as e:
        return jsonify({'error': 'Invalid data format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__=="__main__":
    app.run(debug=True)
