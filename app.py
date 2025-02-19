from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# Vercel needs this for deployment
def handler(event, context):
    from flask_lambda import FlaskLambda
    return FlaskLambda(app)(event, context)

if __name__ == '__main__':
    app.run(debug=True)
