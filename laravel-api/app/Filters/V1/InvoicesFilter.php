<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class InvoicesFilter extends ApiFilter
{


    // $table->integer('customer_id'); // foreign key for customer id
    // $table->integer('amount');
    // $table->string('status'); // billed, paid, void
    // $table->dateTime('billed_date');
    // $table->dateTime('paid_date')->nullable();

    protected $safeParms = [
        'customerId' => ['eq'],
        'amount' => ['eq', 'lt', 'gt', 'lte', 'gte'],
        'status' => ['eq', 'ne'],
        'billedDate' => ['eq', 'eq', 'lt', 'gt', 'lte', 'gte'],
        'paidDate' => ['eq', 'eq', 'lt', 'gt', 'lte', 'gte']
    ];

    protected $columnMap = [
        'customerId' => 'customer_id',
        'billedDate' => 'billed_date',
        'paidDate' => 'paid_date',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'ne' => '!='
    ];
}
