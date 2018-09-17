extern "C" {
#include <string.h>
#include <espressif/esp_common.h>
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
#include <lwip/altcp.h>
#include <lwip/tcpip.h>
#include <lwip/apps/httpd.h>

#include "lib/locks.h"
#include "chgr.h"

#define SOF_ 170
#define EOF_ 171

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
    
    char ch;
    char idx;
    uint8_t buf[10];
      //uint16_t *payload = (uint16_t *)&buf[0];

  for (;;)
  
  {
	   	   
	   ch = getchar();
       if (ch==SOF_)  
       {
		   idx=0;
	   }
		   
	   else if ((ch==EOF_) && (idx==10))
			{
			LwipCoreLock lock();
			httpd_websocket_broadcast(buf, sizeof(buf), WS_BIN_MODE);
			idx=0;
		   }
		   
		else {
		if (idx<10)
			{
			buf[idx]=ch;
			idx++;
			}
		}
  //         vTaskDelay(5);
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
