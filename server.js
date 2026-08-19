"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;


/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());

app.use(express.json());


/* =========================================
   MONGODB CONNECTION
========================================= */

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {

        console.log(
            "MongoDB connected successfully! 🍃"
        );

    })
    .catch((error) => {

        console.error(
            "MongoDB connection error:",
            error
        );

    });


/* =========================================
   BOOKING SCHEMA
========================================= */

const bookingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    phone: {
        type: String,
        trim: true
    },

    program: {
        type: String,
        required: true,
        trim: true
    },

    message: {
        type: String,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});


/* =========================================
   BOOKING MODEL
========================================= */

const Booking = mongoose.model(
    "Booking",
    bookingSchema
);


/* =========================================
   TEST ROUTE
========================================= */

app.get("/", (req, res) => {

    res.send(
        "Hasta Jothi Backend is running! 🍃"
    );

});


/* =========================================
   CREATE BOOKING
========================================= */

app.post(
    "/api/bookings",
    async (req, res) => {

        try {

            const {
                name,
                email,
                phone,
                program,
                message
            } = req.body;


            if (!name || !email || !program) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Name, email and program are required."

                });

            }


            const newBooking = new Booking({

                name,
                email,
                phone,
                program,
                message

            });


            await newBooking.save();


            console.log(
                "New booking saved:",
                newBooking
            );


            res.status(201).json({

                success: true,

                message:
                    "Booking saved successfully!"

            });

        } catch (error) {

            console.error(
                "Booking error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to save booking."

            });

        }

    }
);


/* =========================================
   GET ALL BOOKINGS
========================================= */

app.get(
    "/api/bookings",
    async (req, res) => {

        try {

            const bookings =
                await Booking.find()
                    .sort({
                        createdAt: -1
                    });


            res.status(200).json({

                success: true,

                bookings: bookings

            });

        } catch (error) {

            console.error(
                "Error fetching bookings:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to fetch bookings."

            });

        }

    }
);


/* =========================================
   START SERVER
========================================= */

app.listen(
    PORT,
    () => {

        console.log(
            `Hasta Jothi backend running on port ${PORT}`
        );

    }
);
