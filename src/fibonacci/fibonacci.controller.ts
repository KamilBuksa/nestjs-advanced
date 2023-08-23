import { Controller, Get, Query } from '@nestjs/common';
import { resolve } from 'path';
import Piscina from 'piscina';

@Controller('fibonacci')
export class FibonacciController {
    // add   to tsconfig for Piscina work  // "esModuleInterop": true,
    fibonacciWorker = new Piscina({
        filename: resolve(__dirname, 'fibonacci.worker.js'),
    });


    // curl -X GET -w "\nTime total: %{time_total}s\n" "localhost:3000/fibonacci/?n=41"
    @Get()
    fibonacci(
        @Query('n') n: number, // n - represents the nth number in the Fibonacci sequence, n = 41 is 41st fibonacci number
    ) {
        if (n < 2) {
            return n;
        }
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }





    @Get('worker')
    fibonacciWorkerPiscina(
        @Query('n') n: number, // n - represents the nth number in the Fibonacci sequence, n = 41 is 41st fibonacci number
    ) {

        return this.fibonacciWorker.run(n);
    }

}
