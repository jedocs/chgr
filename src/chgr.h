#pragma once

#include <FreeRTOS.h>
#include <semphr.h>
#include <task.h>


typedef enum {
  STEERING = 0,

  REQ_ORIENTATION = 1,
  RES_ORIENTATION = 2,

  BATTERY = 3,
  BATTERY_CUTOFF = 4,

  REQ_SET_PID_PARAMS = 5,
  RES_SET_PID_PARAMS_ACK = 6,
  REQ_GET_PID_PARAMS = 7,
  RES_PID_PARAMS = 8,

  REQ_SET_GYRO_OFFSETS = 9,
  RES_SET_GYRO_OFFSETS_FAILURE = 10,
  RES_SET_GYRO_OFFSETS_SUCCESS = 11,

  REQ_SAVE_CONFIG = 12,
  RES_SAVE_CONFIG_FAILURE = 13,
  RES_SAVE_CONFIG_SUCCESS = 14,

  REQ_CLEAR_CONFIG = 15,
  RES_CLEAR_CONFIG_FAILURE = 16,
  RES_CLEAR_CONFIG_SUCCESS = 17,

  REQ_LOAD_FLASH_CONFIG = 18,
  RES_LOAD_FLASH_CONFIG_DONE = 19,

  REQ_ENABLE_MOTORS = 20,
  REQ_DISABLE_MOTORS = 21
} ws_msg_t;

//extern chgr_config my_config;

extern SemaphoreHandle_t pid_mutex;
//extern pidsettings pid_settings_arr[2];

//void update_pid_controller(pid_controller_index idx, q16 p, q16 i, q16 d);

void httpd_task(void *pvParameters);

//state get_state();

