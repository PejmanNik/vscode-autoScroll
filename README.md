# AutoScroll README

This extension provides auto scroll to the end of files when files have been changes outside of vs code.
Something can be helpful in watching log files.

## Features

In the `.log` file this extension is enabled and in other files, you need press `F1` and type `Enable Auto Scroll` command to enable it.

In the status bar, you can activate or deactivate auto scrolling. it always shows you end of the file.

![active autoScroll](images/autoscroll.gif)


## Suggestions

For better log viewing you can install

https://marketplace.visualstudio.com/items?itemName=emilast.LogFileHighlighter


## Extension Configuration

AutoScroll extension support the following configuration:

* **autoEnableForLogs**: Automatically enable the auto scroll for files with `log`` language. It is disabled by default.
* **keepLastLineInCenter**: Keep the last line in the center of the screen. By default, it is disabled, and the last line will be kept at the end of the editor.


## Extension Commands

This extension contributes the following settings:

* `autoScroll.enable`: enable this extension
* `autoScroll.disable`: disable this extension
* `autoScroll.toggle`: toggle enable/disable


## Release Notes

## [1.2.0] - 2024-01-07
### Added
- Add option for auto enabling auto scroll for log files

### Fix
- Fix auto scroll after opening documents without checking the autoscroll state

## [1.1.0] - 2022-03-19
### Changed 
- Refactor the project

## [1.0.4] - 2020-07-10
### Added
- Add option for scroll all opened files and change default behavior

## [1.0.3] - 2019-02-04
### Added
- Add setting for change last line position on scrolling

### Fix
- Fix Active pane autoscrolled, not the pane that changed by [@sperry94](https://github.com/sperry94).

## [1.0.2] - 2017-04-17
### Fix
- Fix not scrolling to end of file right after open it

## [1.0.1] - 2017-12-8
### Added
- auto scroll to end of file when it changes outside of vs code
