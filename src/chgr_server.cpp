extern "C" {
#include <string.h>
#include <espressif/esp_common.h>
}
#include <lwip/altcp.h>
#include <lwip/tcpip.h>
#include <lwip/apps/httpd.h>

#include "lib/locks.h"
#include "chgr.h"

static void httpd_websocket_cb(struct altcp_pcb *pcb, uint8_t *data,
                         uint16_t data_len, uint8_t mode)
{
  if (data_len == 0 || mode != 0x02) return;

  uint8_t msgtype = data[0];
 // uint8_t *payload = &data[1];
  data_len -= 1;
  //int8_t *signed_data;
  //pid_controller_index pid_index;
  //int32_t *i32_data;
  //uint8_t res;

  switch (msgtype)
  {
    //case STEERING:
      // Parameters: velocity (int8_t), turn rate (int8_t)
      /*if (data_len != 2) break;
      signed_data = (int8_t *)payload;
      set_steering((FLT_TO_Q16(SPEED_CONTROL_FACTOR) * signed_data[1]) / 128,
        (FLT_TO_Q16(STEERING_FACTOR) * signed_data[0]) / 128);
      *///break;

    //case REQ_ORIENTATION:
      //if (data_len != 0) break;
      //send_orientation(pcb);
      //break;


  }
}

static void battery_task(void *pvParameter)
{
  uint32_t battery_value = 0;
  uint16_t cnt = 0;
  for (;;)
  {
    battery_value = sdk_system_adc_read();
  
    {
      LwipCoreLock lock();
      uint8_t buf[3];
      buf[0] = 0;
      uint16_t *payload = (uint16_t *)&buf[1];
//      payload[0] = battery_value;
	  cnt += 1;
	  if (cnt > 1023) cnt = 0;
	  payload[0] = battery_value;
      httpd_websocket_broadcast(buf, sizeof(buf), 0x02);
      
      
            
    }

    vTaskDelay(5);
  }

  vTaskDelete(NULL);
}

void httpd_task(void *pvParameters)
{
  xTaskCreate(battery_task, "Battery task", 256, NULL, uxTaskPriorityGet(NULL), NULL);

  tCGI pCGIs[] = {
    {"/pid", [](int, int, char*[], char*[]) { return "/pid.html"; }}
  };
  http_set_cgi_handlers(pCGIs, sizeof (pCGIs) / sizeof (pCGIs[0]));

  httpd_websocket_register_callbacks(NULL, (tWsHandler) httpd_websocket_cb);
  httpd_init();

  for (;;);
}
