
extern "C" {
#include <string.h>
#include <espressif/esp_common.h>
#include <user_exception.h>
#include <dhcpserver.h>
#include <esp8266.h>
#include <esp/uart.h>

#include <stdint.h>
#include <sys/types.h>
#include <stdlib.h>
#include <unistd.h>
//#include <string.h>
//#include <esp8266.h>
//#include <esp/uart.h>
#include <stdio.h>
#include "FreeRTOS.h"
#include "task.h"
}

#include "chgr.h"
#define SSID "charger"
#define PRIO_COMMUNICATION  2
#define PRIO_MAIN_LOOP      (TCPIP_THREAD_PRIO + 1)
#define PRIO_SERIAL (PRIO_MAIN_LOOP + 1)

static TaskHandle_t xCalculationTask = NULL;



static void main_loop(void *pvParameters)


{
  for (;;)
  {
    xTaskNotifyWait(0, 0, NULL, 1);
}
}

static void IRAM chgr_exception_handler()
{
  _xt_isr_mask(BIT(INUM_TIMER_FRC1));  // Shut down timer
}

static void wifi_setup()
{
  sdk_wifi_set_opmode(SOFTAP_MODE);
  struct ip_info ap_ip;
  IP4_ADDR(&ap_ip.ip, 192, 168, 100, 1);
  IP4_ADDR(&ap_ip.gw, 192, 168, 100, 1);
  IP4_ADDR(&ap_ip.netmask, 255, 255, 255, 0);
  sdk_wifi_set_ip_info(SOFTAP_IF, &ap_ip);

  struct sdk_softap_config ap_config = {};
  strcpy((char *)ap_config.ssid, SSID);
  ap_config.channel = 1;
  ap_config.ssid_len = strlen(SSID);
  ap_config.authmode = AUTH_OPEN;
  ap_config.max_connection = 1;
  ap_config.beacon_interval = 100;
  sdk_wifi_softap_set_config(&ap_config);

  ip_addr_t first_client_ip;
  IP4_ADDR(&first_client_ip, 192, 168, 100, 2);
  dhcpserver_start(&first_client_ip, 1);
}

extern "C" void user_init(void)
{
  set_user_exception_handler(chgr_exception_handler);
  sdk_system_update_cpu_freq(SYS_CPU_160MHZ);

  uart_set_baud(0, 115200);
  // uart_init(BIT_RATE_115200, BIT_RATE_115200);

  wifi_setup();


  xTaskCreate(&httpd_task, "HTTP Daemon", 256, NULL, PRIO_COMMUNICATION, NULL);
  xTaskCreate(&main_loop, "Main loop", 256, NULL, PRIO_MAIN_LOOP, &xCalculationTask);
  
//gpio
}
