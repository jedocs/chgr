extern "C" {
#include <sysparam.h>
#include <stdio.h>
}

#include "lib/locks.h"
#include "chgr.h"
/*
void load_config()
{
  MutexLock lock(pid_mutex);
  load_hardcoded_config();
  sysparam_get_data_static("ANGLE_PID", (uint8_t *)&my_config.pid_coeffs_arr[ANGLE],
      sizeof(pid_coeffs), NULL, NULL);
  sysparam_get_data_static("VEL_PID", (uint8_t *)&my_config.pid_coeffs_arr[VEL],
      sizeof(pid_coeffs), NULL, NULL);
  sysparam_get_data_static("GYRO_OFFSETS", (uint8_t *)&my_config.gyro_offsets,
      3 * sizeof(int16_t), NULL, NULL);
}
*/

void apply_config_params()
{
  MutexLock lock(pid_mutex);
  //pid_initialize(&my_config.pid_coeffs_arr[ANGLE],
    //  FLT_TO_Q16(SAMPLE_TIME),
      //-Q16_ONE, Q16_ONE, false, &pid_settings_arr[ANGLE]);
  //pid_initialize(&my_config.pid_coeffs_arr[VEL],
    //  FLT_TO_Q16(SAMPLE_TIME),
      //STABLE_ANGLE - FALL_LIMIT, STABLE_ANGLE + FALL_LIMIT, true,
      //&pid_settings_arr[VEL]);
}

bool save_flash_config()
{
  bool success = true;

  {
    MutexLock lock(pid_mutex);
   // success = sysparam_set_data("ANGLE_PID", (uint8_t *)&my_config.pid_coeffs_arr[ANGLE],
     //   sizeof(pid_coeffs), true) == SYSPARAM_OK;
//    if (success) success = sysparam_set_data("VEL_PID", (uint8_t *)&my_config.pid_coeffs_arr[VEL], sizeof(pid_coeffs), true) == SYSPARAM_OK;
  //  if (success) success = sysparam_set_data("GYRO_OFFSETS", (uint8_t *)&my_config.gyro_offsets, 3 * sizeof(int16_t), true) == SYSPARAM_OK;
  }

  return success;
}

bool clear_flash_config()
{
  uint32_t base_addr, num_sectors;
  return sysparam_get_info(&base_addr, &num_sectors) == SYSPARAM_OK &&
    sysparam_create_area(base_addr, num_sectors, true) == SYSPARAM_OK &&
    sysparam_init(base_addr, 0) == SYSPARAM_OK;
}
