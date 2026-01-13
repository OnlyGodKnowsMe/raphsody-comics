// Get elements
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

// Toggle menu on button click
menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
const navLinks = navMenu.querySelectorAll("a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Optional: close menu when clicking outside
document.addEventListener("click", (event) => {
  if (!menuBtn.contains(event.target) && !navMenu.contains(event.target)) {
    navMenu.classList.remove("active");
  }
});

// ================= EPISODE PAGE LOGIC =================

// Only run if episodeImage exists
const episodeImage = document.getElementById("episodeImage");

if (episodeImage) {

    // Get hidden images
    const episodeImages = Array.from(document.querySelectorAll(".episode-images img"));
    let currentIndex = 0; // Start with first image
    let currentScale = 1; // Zoom scale
    const scaleStep = 0.2; // Zoom increment
    const maxScale = 3; // Maximum zoom
    const minScale = 0.5; // Minimum zoom

    // Update displayed image
    function updateImage() {
        episodeImage.src = episodeImages[currentIndex].src;
        // Reset zoom when changing pages
        currentScale = 1;
        episodeImage.style.transform = `scale(${currentScale})`;
    }

    // Prev / Next buttons
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateImage();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < episodeImages.length - 1) {
            currentIndex++;
            updateImage();
        }
    });

    // Zoom buttons
    const zoomInBtn = document.getElementById("zoomInBtn");
    const zoomOutBtn = document.getElementById("zoomOutBtn");

    zoomInBtn.addEventListener("click", () => {
        if (currentScale < maxScale) {
            currentScale += scaleStep;
            episodeImage.style.transform = `scale(${currentScale})`;
        }
    });

    zoomOutBtn.addEventListener("click", () => {
        if (currentScale > minScale) {
            currentScale -= scaleStep;
            episodeImage.style.transform = `scale(${currentScale})`;
        }
    });

    // Optional: support touch pinch zoom later
}

/* PAYSTACK */
document.getElementById('paystack-button').addEventListener('click', function(){
  var handler = PaystackPop.setup({
    key: 'YOUR_PUBLIC_KEY_HERE', // Replace with your Paystack public key
    email: 'supporter@example.com', // You can replace with dynamic user email
    amount: 5000, // Amount in kobo (₦50 = 5000)
    currency: "NGN",
    ref: 'RC'+Math.floor((Math.random() * 1000000000) + 1), // Generate a random ref
    metadata: {
       custom_fields: [
          {
              display_name: "Support for Blade of Balance",
              variable_name: "comic_support",
              value: "Support for Issue #1"
          }
       ]
    },
    callback: function(response){
        alert('Payment successful! Reference: ' + response.reference);
        // You can redirect to a thank-you page here
    },
    onClose: function(){
        alert('Payment window closed.');
    }
  });
  handler.openIframe();
});


/* flutter wave */

document.getElementById('flutterwave-button').addEventListener('click', function () {
    FlutterwaveCheckout({
        public_key: "YOUR_PUBLIC_KEY",
        tx_ref: "RC_" + Math.floor((Math.random() * 1000000000) + 1),
        amount: 500, // Amount in Naira
        currency: "NGN",
        payment_options: "card, ussd, banktransfer, mobilemoneyghana, mobilemoneyuganda",
        customer: {
            email: "supporter@example.com",
            name: "Supporter Name",
        },
        customizations: {
            title: "Blade of Balance",
            description: "Support for our comic",
            logo: "https://yourwebsite.com/logo.png"
        },
        callback: function (data) {
            alert("Payment successful! Reference: " + data.tx_ref);
            // Optionally redirect to a thank-you page
        },
        onclose: function() {
            alert("Payment cancelled.");
        },
    });
});