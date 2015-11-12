
class LivestreamProcess:
	def __init__(self):
		self.stream = None
		self.port = None
		self.arguments = None
		self.process = None
		pass

	def start_process(self, stream, port, arguments):
		pass

	def stop_process(self):
		pass

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