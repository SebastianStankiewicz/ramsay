import requests
import urllib3
from hyperliquid.info import Info
from hyperliquid.utils import constants

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

old_merge_environment_settings = requests.Session.merge_environment_settings

def privileged_merge_environment_settings(self, url, proxies, stream, verify, cert):
    # Force verify to False regardless of what the SDK wants
    settings = old_merge_environment_settings(self, url, proxies, stream, verify, cert)
    settings['verify'] = False
    return settings

requests.Session.merge_environment_settings = privileged_merge_environment_settings

info = Info(constants.TESTNET_API_URL, skip_ws=True)

user_state = info.user_state("0xD5Bf397b557c03814b2eF5272CCb06114DC2eb8D")
print(user_state)