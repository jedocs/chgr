
#include "eyes.h"

const color_t RED    = { .color = 0xb40000 };
const color_t YELLOW = { .color = 0xb4b400 };
const color_t GREEN  = { .color = 0x00b400 };
const color_t BLUE   = { .color = 0x0000b4 };
const color_t LILA   = { .color = 0xb400b4 };
const color_t BLACK  = { .color = 0x000000 };

void set_both_eyes(const color_t color)
{
  color_t colors[2] = { color, color };
  ws2812_i2s_update(colors, PIXEL_RGB);
}

void eyes_init()
{
  ws2812_i2s_init(1, PIXEL_RGB);
}

