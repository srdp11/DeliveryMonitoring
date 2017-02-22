class UpdaterChannel < ApplicationCable::Channel
  def follow(data)
    stop_all_streams
    stream_from "mich_channel:#{data['phone_num']}"
  end

  # def subscribed(data)
  #   #stop_all_streams
  #   #stream_from "mich_channel:#{data['phone_num']}"
  # end
  #
  # def unsubscribed
  #   #stop_all_streams
  # end
end
