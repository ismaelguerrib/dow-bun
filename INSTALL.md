# Installation Guide

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of **Node.js** and **npm** .

## Installing DOW Bun-proxy

To install this project, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/ismaelguerrib/dow-bun
   ```

2. Navigate to the project directory:

   ```
   cd dow-bun
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

## Using DOW Bun-proxy

To use DOW Bun-proxy, follow these steps:

1. Add your own environment config values :

```
cp .env.example .env
```

_I add to the .env.example all the needed data because we are on a simulation and to enable you to test my solution easily, but in an other context I will not_

2. Run the project :

```
bun run index.ts
```

### The project is now running locally ! 🎉

To check the EN version : http://localhost:36107/en-us

To check the FR version : http://localhost:36107/fr-fr

## Contact

If you want to contact me you can reach me at `ismael.guerrib85@gmail.com`.
