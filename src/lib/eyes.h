
#pragma once

#include <stdint.h>

#include "ws2812_i2s/ws2812_i2s.h"

typedef ws2812_pixel_t color_t;

void set_both_eyes(const color_t color);
void eyes_init();

extern const color_t RED;
extern const color_t YELLOW;
extern const color_t GREEN;
extern const color_t BLUE;
extern const color_t LILA;
extern const color_t BLACK;

