const { createApp } = Vue

createApp({
    data() {
        return {
            currentStep: 1,
      		age: null,
			progress: 0,
			intervalId: null,
			countdownFinished: false,
			modal: false,
        }
    },

	computed: {
		disabledButton() {
			return this.age === null || this.age < 18 || this.age > 99;
		}
	},
    methods: {

        step(step) {
			this.currentStep = step

			setTimeout(() => {
				if (this.currentStep === 2) {
				  this.currentStep = 3
				}
			}, 3000)

			if (this.currentStep === 12) {
				this.startCountdown()
			}else {
				clearInterval(this.intervalId);
			}
        },
		startCountdown() {
			this.progress = 0;
			this.countdownFinished = false;
			this.targetProgress = Math.floor(Math.random() * (95 - 75 + 1)) + 75; 
		
			this.intervalId = setInterval(() => {
			  if (this.progress < this.targetProgress) {
				this.progress++;
			  } else {
				clearInterval(this.intervalId);
				this.countdownFinished = true;
				// optionally: this.currentStep = 13;
			  }
			}, 20);
		},
		validateNumber(event) {
			const value = event.target.value;
			if (isNaN(value)) {
			  event.target.value = '';
			  this.age = null;
			}
		},
		onlyNumbers(event) {
			const key = event.key;
			if (!/^\d$/.test(key)) {
			  event.preventDefault();
			}
		}
    },
    created() {

    },
}).mount('#app')