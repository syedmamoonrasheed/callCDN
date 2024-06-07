// Load external CSS and JS dependencies
function loadDependencies(callback) {
    const cssLinks = [
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
    ];

    const jsLinks = [
        'https://code.jquery.com/jquery-3.5.1.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js'
    ];

    let loadedScripts = 0;

    cssLinks.forEach(link => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = link;
        document.head.appendChild(linkElement);
    });

    jsLinks.forEach(link => {
        const scriptElement = document.createElement('script');
        scriptElement.src = link;
        scriptElement.onload = () => {
            loadedScripts++;
            if (loadedScripts === jsLinks.length) {
                callback();
            }
        };
        document.head.appendChild(scriptElement);
    });
}

// Inject CSS styles
function injectStyles() {
    const styles = `
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f8f9fa;
        }

        #call-icon {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #761fe3;
            color: white;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s, transform 0.3s;
        }

        #call-icon:hover {
            background-color: #0056b3;
            transform: scale(1.1);
        }

        #call-popup {
            display: none;
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 320px;
            padding: 20px;
            background: linear-gradient(135deg, #c850c0, #4158d0);
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            z-index: 1000;
            animation: fadeIn 0.3s ease-in-out;
            color: white;
            text-align: center;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        #call-popup h2 {
            margin-bottom: 20px;
            font-size: 20px;
            color: white;
        }

        #call-popup p {
            margin-bottom: 20px;
            color: white;
        }

        #call-popup form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        #call-popup input {
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
            transition: border-color 0.3s, box-shadow 0.3s;
            width: 100%;
            color: black;
        }

        #call-popup input:focus {
            border-color: #761fe3;
            box-shadow: 0 0 5px rgba(118, 31, 227, 0.5);
        }

        #call-popup button {
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            background-color: #761fe3;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s, color 0.3s;
            display: flex;
            align-items: center;
            font-size: 18px;
        }

        #call-popup button:hover {
            background-color: white;
            color: #761fe3;
            transform: scale(1.05);
        }

        #call-popup button i {
            margin-right: 10px;
        }

        .animate-call {
            animation: pulse 1s infinite;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }

        .alert-container {
            margin-top: 10px;
            display: none;
        }

        .alert {
            margin-bottom: 0;
        }

        .profile-picture {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 2px solid white;
            margin-bottom: 10px;
        }

        .block-user {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
        }

        .block-user input {
            margin-right: 5px;
        }

        .iti__flag {
            background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/img/flags.png");
        }

        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .iti__flag {
                background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/img/flags@2x.png");
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

// Inject HTML content
function injectHTML() {
    const callIcon = document.createElement('div');
    callIcon.id = 'call-icon';
    callIcon.innerHTML = '📞';
    callIcon.onclick = toggleCallPopup;
    document.body.appendChild(callIcon);

    const callPopup = document.createElement('div');
    callPopup.id = 'call-popup';
    callPopup.innerHTML = `
        <h2>Incoming Call</h2>
        <img src="https://cdn.jsdelivr.net/gh/syedmamoonrasheed/test@main/profile_picture.jpg" alt="Profile Picture" class="profile-picture">
        <p>Jamie</p>
        <form onsubmit="event.preventDefault(); makeCall();">
            <div class="form-group">
                <label for="phone_number">Phone Number</label>
                <input type="tel" class="form-control" id="phone_number" name="phone_number" placeholder="Enter phone number" required>
            </div>
            <button type="submit" class="btn">
                <i class="fas fa-phone"></i> Call
            </button>
        </form>
        <div id="alert-container" class="alert-container"></div>
        <div class="block-user">
            <input type="checkbox" id="block_user">
            <label for="block_user">Block user</label>
        </div>
    `;
    document.body.appendChild(callPopup);
}

// Toggle call popup visibility
function toggleCallPopup() {
    const popup = document.getElementById('call-popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

// Show flash message
function showFlashMessage(message, status) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `<div class="alert alert-${status}">${message}</div>`;
    alertContainer.style.display = 'block';
    setTimeout(() => {
        alertContainer.style.display = 'none';
    }, 2000);
}

// Make call
function makeCall() {
    const button = document.querySelector('#call-popup button');
    button.classList.add('animate-call');
    const phoneNumber = iti.getNumber();
    $.ajax({
        url: 'http://3.82.61.35:83/make_call',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ phone_number: phoneNumber }),
        success: (response) => {
            button.classList.remove('animate-call');
            showFlashMessage(response.message, response.status);
        },
        error: () => {
            button.classList.remove('animate-call');
            showFlashMessage('An error occurred. Please try again.', 'danger');
        }
    });
}

// Initialize the international telephone input
function initializeIntlTelInput() {
    const input = document.querySelector("#phone_number");
    iti = window.intlTelInput(input, {
        initialCountry: "us",
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        separateDialCode: true
    });
}

// Initialize everything
function initialize() {
    injectStyles();
    injectHTML();
    loadDependencies(initializeIntlTelInput);
}

// Run the initialization
initialize();
