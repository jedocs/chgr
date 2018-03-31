#pragma once

#include <FreeRTOS.h>
#include <semphr.h>
#include <task.h>

//extern SemaphoreHandle_t pid_mutex;

void httpd_task(void *pvParameters);


