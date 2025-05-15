<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained();
            $table->foreignId('work_type_id')->constrained();
            $table->string('title');
            $table->text('description');
            $table->text('responsibilities')->nullable();
            $table->text('qualifications')->nullable();
            $table->string('salary_range')->nullable();
            $table->string('benefits')->nullable();
            $table->string('location');
            $table->date('application_deadline');
            $table->enum('status', ['pending', 'approved', 'rejected', 'archived'])->default('pending');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};