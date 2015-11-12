import subprocess

class LivestreamProcess:
  def __init__(self):
    self.TWITCH_URL = "http://www.twitch.tv/"
    self.stream = None
    self.port = None
    self.arguments = None
    self.process = None
    pass

  def start_process(self, stream, port, arguments):
    print(arguments)
    print(stream.replace('\n',''))
    self.stream = stream.replace('\n','')
    self.port = port
    self.arguments = arguments
    allargs = ' '.join(['livestreamer', self.__get_stream_url(), 'best',
        self.__get_port_argument()] + arguments )
    print(allargs)
    self.process = subprocess.Popen( allargs, stdout=subprocess.PIPE,shell=True)

    """while True:
      output = self.process.stdout.readline()
      if output == '' and self.process.poll() is not None:
        break
      if output:
        print(output.strip())
    rc = process.poll()
    return rc"""
    print(self.process.stdout.readline())

  def __get_port_argument(self):
    return "--player-external-http-port " + str(self.port)

  def __get_stream_url(self):
    return (self.TWITCH_URL + self.stream).replace('\n','')

  def stop_process(self):
    if(self.process != None):
      self.process.kill
    self.process = None
    self.stream = None
    self.port = None
    self.arguments = None

  """ Returns the process as an object with process information """
  def get_process_info(self):
    return {
        'process': self.__get_info()
        }

    """ Private Function to get process as object """
  def __get_info(self):
    if self.process == None:
      return None
    else:
      return {
          'stream': self.stream,
          'port': self.port,
          'arguments': self.arguments,
          }
