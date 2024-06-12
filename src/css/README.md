# Sequencer

This is a simple sequencer program which allows for programming of drum beats. The sequencer has three channels with preset sounds, which are:

-   kick drum
-   Hi-hat
-   Snare

These sounds cannot be updated at runtime, instead the user can choose when to trigger them. It is also possible to change the tempo of the beat.

## Installation

Running and developing this program requires the [Bun javascript runtime](https://github.com/oven-sh/bun). After cloning this repository, navigate into the top directory and run:

```bash
$ bun install
```

to install all necesarry packages.

## Running the program

To start a development server, run the following command:

```bash
$ bun run dev
```

then open a web browser and navigate to [localhost on port 5173](http://localhost:5173).
