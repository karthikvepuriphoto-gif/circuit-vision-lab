import json
S={
"cv":("JKc66/CircuitVision","https://github.com/JKc66/CircuitVision"),
"i2s":("s39674/Image2schematic","https://github.com/s39674/Image2schematic"),
"pcd":("s39674/PCB-Component-Detection","https://github.com/s39674/PCB-Component-Detection"),
"pd":("SanderGi/PCB-Detection","https://github.com/SanderGi/PCB-Detection"),
"nl":("NYCU-AI-EDA/Netlistify","https://github.com/NYCU-AI-EDA/Netlistify"),
"yolo":("Ultralytics YOLO docs","https://docs.ultralytics.com/"),
"sam":("Segment Anything (Meta)","https://github.com/facebookresearch/segment-anything"),
"ocr":("EasyOCR","https://github.com/JaidedAI/EasyOCR"),
"ngs":("ngspice docs","https://ngspice.sourceforge.io/docs.html"),
"nal":("NetAutLabs","https://github.com/NetAutLabs/netautlabs"),
"clab":("Containerlab docs","https://containerlab.dev/"),
"netlab":("netlab docs","https://netlab.tools/"),
"npb":("CiscoDevNet/netprog_basics","https://github.com/CiscoDevNet/netprog_basics"),
"devnet":("Cisco DevNet Learning Labs","https://developer.cisco.com/learning/"),
"nm":("Netmiko docs","https://ktbyers.github.io/netmiko/"),
"nmgh":("ktbyers/netmiko","https://github.com/ktbyers/netmiko"),
"awe":("awesome-network-automation","https://github.com/networktocode/awesome-network-automation"),
"ans":("Ansible docs","https://docs.ansible.com/"),
"ansios":("Ansible cisco.ios collection","https://docs.ansible.com/ansible/latest/collections/cisco/ios/index.html"),
"nor":("Nornir docs","https://nornir.readthedocs.io/"),
"nap":("NAPALM docs","https://napalm.readthedocs.io/"),
"nc":("RFC 6241 NETCONF","https://datatracker.ietf.org/doc/html/rfc6241"),
"rc":("RFC 8040 RESTCONF","https://datatracker.ietf.org/doc/html/rfc8040"),
}
E=[]
def a(t,q,k,ans,src): E.append({"track":t,"q":q,"k":k,"a":ans,"src":[{"t":S[s][0],"u":S[s][1]} for s in src]})
C="circuit";N="network"
# Circuit vision
a(C,"What is circuit vision?","definition overview image schematic pcb","Using computer vision to turn a photo or drawing of a circuit (schematic or PCB) into structured data: detected components, connections, a netlist, or SPICE input.",["cv","i2s"])
a(C,"Where should I start learning circuit vision?","beginner start first","Start with JKc66/CircuitVision (upload an image, see detected parts and a netlist), then study Image2schematic for the full pipeline, then the PCB detection repos, and Netlistify for SPICE-quality output.",["cv","i2s","nl"])
a(C,"What does JKc66/CircuitVision do?","circuitvision streamlit app","It is a Streamlit app: you upload a circuit image, it detects components and builds a netlist. Good for a quick hands-on demo. Check its README for install steps.",["cv"])
a(C,"What is Netlistify?","netlistify spice schematic","A research project from NYCU AI-EDA that converts schematic images into netlists/SPICE. Use it when you need simulation-oriented output. See the repo README for models and setup.",["nl"])
a(C,"What is Image2schematic?","pcb photo schematic pipeline","A project that goes from a PCB photo toward a schematic, showing the steps: preprocessing, component detection, and trace/connection reconstruction.",["i2s"])
a(C,"Which repo detects components on a PCB photo?","pcb detection components board","Look at s39674/PCB-Component-Detection and SanderGi/PCB-Detection. Try both on your own board photos and compare.",["pcd","pd"])
a(C,"Schematic image vs PCB photo — what's the difference for CV?","schematic pcb difference","A schematic is a clean line drawing of symbols and wires, so symbol detection plus line tracing works well. A PCB photo has real parts, shadows, traces on several layers, and hidden vias, so it is much harder and often incomplete.",["i2s","cv"])
a(C,"What is a netlist?","netlist definition nets nodes","A text list of the components and the nets (electrical nodes) that each pin connects to. It is what simulators and layout tools consume.",["ngs","nl"])
a(C,"What is SPICE?","spice simulator simulation","SPICE is a circuit simulator family. You feed it a netlist with component values and models, and it computes voltages and currents (DC, AC, transient). ngspice is a free open-source version.",["ngs"])
a(C,"How do I simulate a netlist?","simulate ngspice run","Install ngspice, save the netlist as a .cir/.sp file with an analysis line (e.g. .tran or .op) and .end, then run: ngspice file.cir. See the ngspice manual for analysis commands.",["ngs"])
a(C,"What does a SPICE resistor line look like?","spice syntax resistor line","Format: R<name> <node1> <node2> <value>, e.g. R1 in out 10k. Capacitors start with C, inductors with L, diodes with D, voltage sources with V.",["ngs"])
a(C,"What is node 0 in SPICE?","ground node 0 gnd","Node 0 is ground, the reference for every voltage. Every SPICE circuit needs a path to node 0.",["ngs"])
a(C,"What is a .model statement?","model spice diode transistor","It defines parameters for semiconductor devices (diodes, transistors), e.g. .model D1N4148 D(...). Without a correct model, simulation of active parts is not meaningful.",["ngs"])
a(C,"What is a BOM?","bill of materials bom","Bill of Materials: the list of part types, values, packages, and quantities. Detected components can be grouped into a BOM after CV.",["cv"])
a(C,"What are reference designators?","designator r1 c1 u1 annotation","Labels like R1, C3, U2, Q1, D4. The letter tells the part type: R resistor, C capacitor, L inductor, D diode, Q transistor, U IC, J connector, Y crystal, F fuse.",["cv"])
a(C,"How do I identify a resistor?","resistor identify color bands","Through-hole resistors are small cylinders with color bands; SMD resistors are small black rectangles with a printed number code (e.g. 103 = 10k). Schematic symbol: zigzag or rectangle. Designator R.",["pcd"])
a(C,"How do I read SMD resistor codes?","smd code 103 472","Three-digit code: two digits then the multiplier power of ten. 103 = 10 x 10^3 = 10 kΩ; 472 = 4.7 kΩ. An R marks the decimal point (4R7 = 4.7 Ω).",["pcd"])
a(C,"How do I identify a capacitor?","capacitor identify electrolytic ceramic","Ceramic SMD caps are tan/brown rectangles usually with no marking; electrolytics are cylinders with a stripe marking the negative lead. Symbol: two parallel plates (one curved for polarized). Designator C.",["pcd"])
a(C,"How do I tell diode polarity?","diode polarity cathode stripe","The band/stripe marks the cathode. In the symbol, the bar is the cathode and the triangle points toward it (direction of conventional current).",["pcd"])
a(C,"How do I identify an IC?","ic chip package u","ICs are black packages with many pins (SOIC, QFP, QFN, BGA). A dot or notch marks pin 1. Designator U. Read the part number on top and look up the datasheet.",["pcd"])
a(C,"How do I find pin 1 on a chip?","pin 1 dot notch","Look for a dot, dimple, notch, or beveled edge; pin 1 is next to it, and pins count counter-clockwise from the top view on most packages.",["pcd"])
a(C,"How do I identify an inductor?","inductor coil identify","Often a coil of wire, or a block marked with a code; power inductors are larger dark squares. Symbol: a series of loops. Designator L.",["pcd"])
a(C,"How do I identify a transistor?","transistor mosfet bjt package","Three-terminal parts in TO-92, SOT-23, or TO-220 packages. Designator Q. Check the printed code against the datasheet to know the pinout.",["pcd"])
a(C,"How should I photograph a board for circuit vision?","photo capture lighting camera","Use even diffuse lighting, keep the camera parallel to the board, fill the frame, focus on markings, shoot both sides, and keep original full-resolution files. See the Photo checklist on the Circuit Vision page.",["i2s","pcd"])
a(C,"Why is glare a problem in PCB photos?","glare reflection lighting","Glare washes out markings and makes shiny solder look like other features, which hurts detection and OCR. Use diffuse light or a polarizer and avoid direct flash.",["pcd"])
a(C,"What resolution should board photos be?","resolution megapixel quality","Use the highest resolution you can and avoid compression. Small SMD markings need many pixels; tile and stitch large boards rather than shrinking them.",["pcd"])
a(C,"What is YOLO?","yolo object detection ultralytics","YOLO is a fast object detection model family. In circuit vision it locates components with bounding boxes. Ultralytics documents training on custom datasets.",["yolo"])
a(C,"How do I train YOLO on my own components?","train custom dataset yolo labels","Label images with boxes per class (resistor, capacitor, ...), arrange them in YOLO format with a data YAML, then train with the Ultralytics CLI or Python API. Follow the Ultralytics training guide.",["yolo"])
a(C,"How many images do I need to train a detector?","dataset size images training","There's no fixed number; more varied labeled images help. Start with a pretrained model and fine-tune; check validation mAP to see if you need more data.",["yolo"])
a(C,"What is mAP?","map metric precision recall","Mean Average Precision: the standard detection accuracy metric combining precision and recall across classes and IoU thresholds. Higher is better.",["yolo"])
a(C,"What is SAM (Segment Anything)?","sam segment anything segmentation mask","Meta's Segment Anything Model produces pixel masks for objects from prompts like points or boxes. It can outline parts or traces, but it does not know component classes by itself.",["sam"])
a(C,"Detection vs segmentation — which do I need?","detection segmentation difference","Detection gives boxes + labels (good for counting/identifying parts). Segmentation gives exact pixel outlines (good for traces, pads, precise shapes). Many pipelines combine both.",["yolo","sam"])
a(C,"How do I read part markings with OCR?","ocr text markings easyocr","Crop each detected component and run OCR (e.g. EasyOCR) on it. Tiny laser-etched text often needs upscaling, contrast enhancement, and manual checking.",["ocr"])
a(C,"Why does OCR fail on chip markings?","ocr fail low contrast","Markings are small, low-contrast, and often rotated. Improve lighting, crop tightly, rotate upright, upscale, and verify manually.",["ocr"])
a(C,"How are wires/connections found in a schematic image?","wire line tracing connections","Pipelines remove detected symbols, then trace remaining lines (e.g. with thresholding and line/contour detection) and find junctions to group pins into nets.",["i2s","nl"])
a(C,"Can circuit vision recover connections from a PCB photo?","pcb traces connections multilayer","Only partially. Top-layer traces are visible, but inner layers and vias under parts are hidden. Expect to verify with a multimeter continuity check or the design files.",["i2s"])
a(C,"How do I verify a CV-generated netlist?","verify netlist check","Compare against the schematic or design files, spot-check nets with a continuity meter, check that every part has the expected pin count, and simulate a simple case.",["ngs","nl"])
a(C,"Which tool should I use for a quick demo?","demo quick tool choice","CircuitVision (Streamlit) is the fastest way to show image → parts → netlist.",["cv"])
a(C,"Which tool for SPICE-ready output?","spice output tool choice","Netlistify targets schematic-to-netlist conversion for simulation.",["nl"])
a(C,"How do I run a Streamlit app?","streamlit run python","Install requirements (pip install -r requirements.txt), then run: streamlit run <app file>.py and open the local URL it prints. Check the repo README for the exact file name.",["cv"])
a(C,"What is a Python virtual environment and why use one?","venv virtualenv python setup","A venv isolates a project's packages: python -m venv .venv, then activate it and pip install. It avoids version conflicts between repos.",["cv"])
a(C,"Do I need a GPU?","gpu cuda hardware","Inference on a few images works on CPU. Training detectors is much faster with an NVIDIA GPU; cloud notebooks are an option.",["yolo"])
a(C,"What is image preprocessing?","preprocessing grayscale threshold","Steps like resizing, grayscale, denoising, contrast adjustment, thresholding, and perspective correction that make images easier for models.",["i2s"])
a(C,"How do I fix a tilted photo?","perspective warp correction homography","Apply a perspective transform (homography) using the four board corners, e.g. with OpenCV getPerspectiveTransform + warpPerspective.",["i2s"])
a(C,"What is a footprint vs symbol?","footprint symbol layout","A symbol is the schematic drawing; a footprint is the physical copper pad pattern on the PCB. The same part has both.",["cv"])
a(C,"What is a via?","via pcb layer","A plated hole connecting copper layers. Vias hide connections between layers, which limits photo-based reconstruction.",["i2s"])
a(C,"What should I include in a CV handoff?","handoff documentation deliverable","Original images, board name/revision, which side is which, the detected component list with confidence, open questions, and any manual corrections.",["cv"])
a(C,"What is labeling/annotation for training?","label annotation dataset","Drawing boxes or masks on images and assigning class names so a model can learn. Consistent class definitions matter more than tools.",["yolo"])
a(C,"How do I measure if a model is good enough?","evaluate validation accuracy","Hold out a test set of your real boards, check precision/recall per class, and review false detections visually.",["yolo"])
a(C,"What is a confidence threshold?","confidence threshold detection","Detections below the threshold are discarded. Raise it for fewer false positives, lower it to miss fewer parts.",["yolo"])
# Network
a(N,"Where do I start learning network automation?","start beginner network automation","Begin with NetAutLabs for hands-on labs and CiscoDevNet/netprog_basics for fundamentals, then learn Netmiko, then labs-as-code with Containerlab or netlab.",["nal","npb","nm"])
a(N,"What is SSH?","ssh secure shell cli","Secure Shell: encrypted remote CLI access, normally TCP port 22. It's the main way to log into network devices and what Netmiko uses.",["nm"])
a(N,"How do I enable SSH on a Cisco IOS device?","enable ssh cisco ios crypto key","Typical steps: set hostname and ip domain-name, crypto key generate rsa (2048 bits), ip ssh version 2, create a local user, then on line vty 0 4 set transport input ssh and login local. Check your platform's guide.",["devnet"])
a(N,"Why can't I SSH to a device?","ssh fail timeout refused troubleshoot","Check reachability (ping), that port 22 is open/ACLs allow you, SSH is enabled with keys generated, vty lines allow ssh, and credentials are correct. 'Connection refused' usually means SSH not enabled; timeout usually means path/firewall.",["nm"])
a(N,"What is Netmiko?","netmiko python ssh library","A Python library by Kirk Byers that simplifies SSH to many network vendors: connect, send show commands, push config, save.",["nm","nmgh"])
a(N,"How do I install Netmiko?","install netmiko pip","pip install netmiko (ideally inside a virtual environment).",["nm"])
a(N,"How do I run a show command with Netmiko?","netmiko send_command show","Create ConnectHandler(**device) with device_type, host, username, password, then output = conn.send_command('show ip interface brief').",["nm"])
a(N,"How do I push config with Netmiko?","netmiko send_config_set config","Use conn.send_config_set([list of commands]); it enters and exits config mode for you. Then conn.save_config() if needed.",["nm"])
a(N,"What device_type should I use in Netmiko?","device_type platform vendor","It matches the platform, e.g. cisco_ios, cisco_nxos, cisco_xr, arista_eos, juniper_junos. The Netmiko docs/repo list supported platforms.",["nm","nmgh"])
a(N,"How do I get structured output from Netmiko?","textfsm parse structured use_textfsm","Pass use_textfsm=True to send_command to parse output into Python data using TextFSM/ntc-templates when a template exists.",["nm"])
a(N,"Netmiko times out — what do I do?","netmiko timeout read_timeout","Increase read_timeout on send_command for slow commands, check the prompt is detected, and confirm the device_type is correct.",["nm"])
a(N,"How do I keep passwords out of scripts?","credentials secrets password env","Read them from environment variables, getpass, or a vault (e.g. Ansible Vault). Never commit them to Git.",["nm","ans"])
a(N,"What is a VLAN?","vlan definition layer 2","A Virtual LAN splits one switch into separate Layer 2 broadcast domains, identified by a VLAN ID (1-4094).",["devnet"])
a(N,"How do I create a VLAN on Cisco IOS?","create vlan cisco","conf t, vlan 10, name USERS, then on an access port: interface Gi0/1, switchport mode access, switchport access vlan 10.",["devnet"])
a(N,"What is a trunk port?","trunk 802.1q tagging","A link that carries multiple VLANs using 802.1Q tags, typically between switches or to a router/firewall.",["devnet"])
a(N,"Access port vs trunk port?","access trunk difference","An access port carries one untagged VLAN for an end device; a trunk carries several tagged VLANs between network devices.",["devnet"])
a(N,"Devices in the same VLAN can't talk — why?","vlan troubleshoot connectivity not working broken cannot talk ping fail","Check both ports are in the same VLAN, the VLAN exists, the trunk allows it, the ports are up, and IP addresses are in the same subnet.",["devnet"])
a(N,"What is routing?","routing layer 3 basics","Forwarding packets between different IP networks based on a routing table. Routes come from connected interfaces, static config, or dynamic protocols like OSPF and BGP.",["devnet"])
a(N,"How do I add a static route?","static route ip route","Cisco IOS: ip route <destination> <mask> <next-hop>, e.g. ip route 10.2.0.0 255.255.0.0 192.168.1.1.",["devnet"])
a(N,"What is a default route?","default route 0.0.0.0","A route matching everything not otherwise known: ip route 0.0.0.0 0.0.0.0 <next-hop>. Commonly points to the internet edge.",["devnet"])
a(N,"What is OSPF?","ospf dynamic routing igp","A link-state interior routing protocol: routers share link info within areas and compute shortest paths. Common in enterprise networks.",["devnet","netlab"])
a(N,"What is BGP?","bgp border gateway","Border Gateway Protocol exchanges routes between autonomous systems (internet, data centers). It's policy-driven and runs over TCP 179.",["netlab"])
a(N,"How do I check the routing table?","show ip route routing table","Cisco: show ip route. Look for the route to your destination and its next hop.",["devnet"])
a(N,"What is a subnet mask?","subnet mask cidr","It splits an IP into network and host parts. /24 = 255.255.255.0 = 256 addresses (254 usable hosts).",["devnet"])
a(N,"How do I troubleshoot connectivity step by step?","troubleshoot ping traceroute layers","Go bottom up: link/interface up? correct VLAN? IP/mask/gateway right? ping gateway, then destination; traceroute to see where it stops; check ACLs and routes.",["devnet"])
a(N,"What does show ip interface brief tell me?","show ip interface brief status","Each interface's IP and its status/protocol. up/up is healthy; administratively down means shutdown is configured; up/down often means a Layer 2 problem.",["devnet"])
a(N,"What is NETCONF?","netconf xml yang rpc","An IETF protocol (RFC 6241) to read/change config using XML RPCs, usually over SSH port 830. Supports candidate configs and commit on capable devices.",["nc","devnet"])
a(N,"What is RESTCONF?","restconf rest http yang","An HTTP-based protocol (RFC 8040) to access YANG-modeled data with GET/PUT/PATCH/POST/DELETE, using JSON or XML.",["rc","devnet"])
a(N,"What is YANG?","yang data model","A data modeling language describing device configuration and state. NETCONF and RESTCONF use YANG models.",["nc","rc"])
a(N,"NETCONF vs RESTCONF — which should I use?","netconf restconf compare","NETCONF has richer transactions (candidate datastore, locking); RESTCONF is simpler for web/REST tooling. Use what your platform supports and your tools prefer.",["nc","rc"])
a(N,"NETCONF/RESTCONF vs CLI scraping?","api vs cli screen scraping","APIs return structured data and validate changes; CLI scraping (Netmiko) works everywhere but needs output parsing. Many teams use both.",["nc","nm"])
a(N,"What is Ansible?","ansible playbook agentless","An agentless automation tool. You write YAML playbooks that run tasks against an inventory of hosts; for network devices it connects via SSH/APIs.",["ans"])
a(N,"How do I configure Cisco devices with Ansible?","ansible cisco ios collection","Use the cisco.ios collection (e.g. cisco.ios.ios_config, ios_vlans) with ansible_connection: ansible.netcommon.network_cli and ansible_network_os: cisco.ios.ios.",["ansios"])
a(N,"What is an Ansible inventory?","inventory hosts groups","A file listing hosts and groups (INI or YAML) plus variables like connection type and OS.",["ans"])
a(N,"What is an Ansible role?","role structure reuse","A reusable bundle of tasks, templates, variables, and handlers with a standard folder layout, so playbooks stay short.",["ans"])
a(N,"How do I do a dry run in Ansible?","check mode dry run diff","Run ansible-playbook with --check (and --diff to see changes). Not every module supports check mode.",["ans"])
a(N,"What is Ansible Vault?","vault encrypt secrets","It encrypts sensitive variables/files: ansible-vault create secrets.yml; run playbooks with --ask-vault-pass.",["ans"])
a(N,"What is Nornir?","nornir python framework","A Python automation framework: inventory plus concurrent task execution, using plugins like Netmiko or NAPALM. It's Ansible-like but pure Python.",["nor"])
a(N,"Nornir vs Ansible?","nornir ansible compare","Ansible uses YAML playbooks and is easy to share; Nornir is Python code, faster and more flexible for developers. Pick based on your team's skills.",["nor","ans"])
a(N,"What is NAPALM?","napalm multivendor getters","A Python library with a vendor-neutral API for getting facts and replacing/merging config, with compare_config and rollback on supported drivers.",["nap"])
a(N,"What is Containerlab?","containerlab lab docker topology","A tool to build network labs from a YAML topology file using container-based network OSs. clab deploy -t file.clab.yml starts it.",["clab"])
a(N,"How do I start a Containerlab topology?","containerlab deploy destroy","sudo containerlab deploy -t mylab.clab.yml; inspect with containerlab inspect; remove with containerlab destroy -t mylab.clab.yml.",["clab"])
a(N,"What is netlab?","netlab ipspace lab","A tool by ipSpace that builds labs from a high-level topology and also configures routing protocols for you, using Containerlab or libvirt as providers.",["netlab"])
a(N,"Containerlab vs netlab?","containerlab netlab compare","Containerlab deploys nodes and links; netlab sits on top, generating topology plus device configs (addressing, OSPF, BGP...). Use netlab for quick protocol labs.",["clab","netlab"])
a(N,"What is topology-as-code?","topology as code lab git","Describing your lab in a version-controlled file (YAML) so it can be rebuilt identically any time. Containerlab and netlab do this.",["clab","netlab"])
a(N,"Where can I practice on real Cisco gear for free?","sandbox practice cisco free","Cisco DevNet Sandboxes and Learning Labs provide free lab environments.",["devnet"])
a(N,"How do I back up a device config?","backup config running","Save show running-config to a dated file (Netmiko, Ansible, or a tool like Oxidized/RANCID), ideally committed to Git.",["nm","ans"])
a(N,"How do I roll back a bad change?","rollback revert config","Options: re-apply the backup, use configure replace (Cisco IOS archive), commit confirmed / rollback on Junos/IOS-XR, or NAPALM rollback. Plan the rollback before the change.",["nap"])
a(N,"What is commit confirmed?","commit confirmed rollback timer","On Junos/IOS-XR, a commit that rolls back automatically unless you confirm within a timer, protecting you from locking yourself out.",["nc"])
a(N,"What should a change checklist include?","change management checklist","Approval/window, backup, pre-checks, the exact commands, lab test, post-checks, rollback plan, and ticket notes. See the Config change checklist on the Networks page.",["nal"])
a(N,"Running-config vs startup-config?","running startup save","running-config is live in memory; startup-config loads at boot. Save with copy running-config startup-config (or write memory) or changes are lost on reload.",["devnet"])
a(N,"How do I avoid locking myself out?","lockout safe change","Use commit confirmed or 'reload in 10' before risky changes, keep console/out-of-band access, and apply ACLs carefully.",["devnet"])
a(N,"How do I store configs in Git?","git version control configs","Back up configs to a repo on a schedule, commit with timestamps, and use diffs to see what changed.",["awe"])
a(N,"What is idempotency?","idempotent automation","Running the same automation twice gives the same result without extra changes. Ansible resource modules aim for this.",["ans"])
a(N,"What is Jinja2 templating?","jinja2 template config generation","A template language used to generate configs from variables, e.g. {{ hostname }}. Ansible and many Python tools use it.",["ans"])
a(N,"What is TextFSM?","textfsm parsing","A template-based parser that turns CLI output into tables; ntc-templates provides many ready-made templates.",["nm"])
a(N,"Where can I find more network automation tools?","tools list resources","The networktocode awesome-network-automation list collects tools, books, and communities.",["awe"])
a(N,"What is SNMP?","snmp monitoring","Simple Network Management Protocol polls device counters/status and sends traps. Use SNMPv3 for authentication and encryption.",["awe"])
a(N,"What is streaming telemetry / gNMI?","gnmi telemetry streaming","Devices push structured data continuously (often via gNMI over gRPC) instead of being polled, for faster monitoring.",["awe"])
a(N,"What is an ACL?","acl access control list","An ordered list of permit/deny rules on packets. It ends with an implicit deny, so order and a final permit matter.",["devnet"])
a(N,"How do I test automation safely?","test lab safe","Run against a Containerlab/netlab copy or a DevNet sandbox first, use check/dry-run modes, then a small pilot group.",["clab","devnet"])
a(N,"What is Python's role in network automation?","python learn","Python drives most libraries (Netmiko, NAPALM, Nornir). Learn basics: variables, lists/dicts, loops, functions, files, and JSON.",["npb"])
a(N,"How do I call a REST API from Python?","requests python api","Use the requests library: requests.get(url, auth=..., headers={'Accept':'application/yang-data+json'}, verify=...). Check status_code then .json().",["rc","npb"])
a(N,"What port does NETCONF use?","netconf port 830","NETCONF over SSH uses TCP port 830 by default.",["nc"])
json.dump(E,open("kb.json","w"),ensure_ascii=False,indent=1)
print(len(E))
