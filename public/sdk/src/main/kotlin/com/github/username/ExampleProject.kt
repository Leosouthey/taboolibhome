package com.github.username

import taboolib.common.platform.Plugin
import taboolib.common.platform.function.info

object ExampleProject : Plugin() {

    override fun onEnable() {
        info("Successfully running ExamplePlugin!")
    }
}