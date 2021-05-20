!macro customInstall
  DetailPrint "Register bookmate URI Handler"
  DeleteRegKey HKCR "bookmate"
  WriteRegStr HKCR "bookmate" "" "URL:bookmate"
  WriteRegStr HKCR "bookmate" "URL Protocol" ""
  WriteRegStr HKCR "bookmate\shell" "" ""
  WriteRegStr HKCR "bookmate\shell\Open" "" ""
  WriteRegStr HKCR "bookmate\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend